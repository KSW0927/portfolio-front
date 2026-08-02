import { z } from "zod";

// 공통 에러 메시지 처리를 위한 커스텀 스키마
export const commonSchemas = {
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다")
        .regex(/[A-Z]/, "대문자를 하나 이상 포함해야 합니다.")
        .regex(/[0-9]/, "숫자를 하나 이상 포함해야 합니다.")
        .regex(/[@$!%*#?&]/, "특수문자를 하나 이상 포함해야 합니다."),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요.").max(50, "이름은 최대 50자까지 입력할 수 있습니다."),
};

// 특정 도메인 스키마 (예: 로그인)
export const loginSchema = z.object({
    email: commonSchemas.email,
    password: z.string().min(1, "비밀번호를 입력해주세요."),
});

// TypeScript 타입 추출(자동 타입 추론)
export type LoginInput = z.infer<typeof loginSchema>;

// 다른 도메인 스키마도 여기에 추가 가능 (예: 회원가입, 프로필 업데이트 등)S