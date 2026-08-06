import type { ComponentType, ReactElement } from 'react'
import type { RouteObject } from 'react-router-dom'

type PageModule = {
    default: ComponentType
}

type GeneratedRoute = {
    path: string
    element: ReactElement
}

type AutoRouteConfig = {
    pageModules: Record<string, PageModule>
    defaultPath: string
    defaultRoute: string
    routeOrder: readonly string[]
    transformPath?: (filePath: string) => string
}

/*
* 메인 - 대시보드
*/
const mainPageModules = import.meta.glob<PageModule>('@/pages/main/**/*.tsx', {
    eager: true,
})

function toLowerCamelRoutePath(filePath: string) {
    const fileName = filePath.split('/').pop()?.replace('.tsx', '') ?? ''
    return fileName ? fileName.charAt(0).toLowerCase() + fileName.slice(1) : ''
}

function createAutoRoutes(config: AutoRouteConfig): RouteObject[] {
    const routeOrderMap = new Map<string, number>(config.routeOrder.map((path, index) => [path, index]))
    const transformPath = config.transformPath ?? toLowerCamelRoutePath

    const generatedRoutes: GeneratedRoute[] = Object.entries(config.pageModules)
        // default export가 없는 모듈(위젯, 하위 컴포넌트 등 페이지가 아닌 파일)은 라우트 대상에서 제외
        .filter(([, module]) => !!module.default)
        .map(([filePath, module]) => {
            const path = config.defaultPath != 'main' ? config.defaultPath + '/' + transformPath(filePath) : transformPath(filePath)
            const Component = module.default

            return {
                path,
                element: <Component />,
            }
        })
        .filter((route) => route.path)
        .sort((left, right) => {
            const leftOrder = routeOrderMap.get(left.path) ?? Number.MAX_SAFE_INTEGER
            const rightOrder = routeOrderMap.get(right.path) ?? Number.MAX_SAFE_INTEGER

            if (leftOrder !== rightOrder) {
                return leftOrder - rightOrder
            }

            return left.path.localeCompare(right.path)
        })

    const defaultRoute = generatedRoutes.find((route) => route.path === config.defaultRoute)

    return [
        ...(defaultRoute ? [{ path: config.defaultPath, element: defaultRoute.element }] : []),
        ...generatedRoutes,
    ]
}

const mainRoutes = createAutoRoutes({
    pageModules: mainPageModules,
    defaultPath: 'main',
    defaultRoute: 'main',
    routeOrder: [
        'main',
        'notice',
    ],
})

export const pagesRoutes: RouteObject[] = [
    ...mainRoutes,
]
