import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Badge, Box, Button, Divider, Icon, Layout, List, Space, Typography, Textarea } from "@/publishing/components";

type Comment = {
    id: number;
    profileImage?: string;
    author: string;
    content: string;
    date: string;
    replies?: Omit<Comment, "replies">[];
};

const commentData: Comment[] = [
    {
        id: 1,
        author: "홍길동 과장",
        content: "안녕하세요. 자료 감사합니다.",
        date: "2026-01-01 15:00",
        replies: [
            { id: 11, author: "김해운 주임", content: "네, 감사합니다.", date: "2026-01-01 15:00" },
            { id: 12, author: "이조선 대리", content: "저도 감사합니다.", date: "2026-01-01 15:00" },
        ],
    },
    {
        id: 2,
        author: "홍길동 주임",
        content: "안녕하세요. 자료 감사합니다.",
        date: "2026-01-01 15:00",
        replies: [],
    },
    {
        id: 3,
        author: "홍길동 주임",
        content: "안녕하세요. 자료 감사합니다.",
        date: "2026-01-01 15:00",
        replies: [],
    },
];

export function UI_KSP_8262_R() {
    const isMobile = useIsMobile();
    const [prevHover, setPrevHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [replyOpenId, setReplyOpenId] = useState<number | null>(null);
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Record<number, string>>({});

    useEffect(() => {
        if (menuOpenId === null) return;
        const handleOutsideClick = () => setMenuOpenId(null);
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [menuOpenId]);

    const handleMenuToggle = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setMenuOpenId(menuOpenId === id ? null : id);
    };

    const handleEditStart = (id: number, content: string) => {
        setEditValues((prev) => ({ ...prev, [id]: content }));
        setEditingId(id);
        setMenuOpenId(null);
    };

    return (
        <Layout title="자유게시판" favorite={false} activeMenuId="">

            {/* Title */}
            <Layout.Row layout="vertical" gap={18}>
                <Layout.Col layout="horizontal" align="center" gap={8}>
                    <Badge size="lg" rounded>공지</Badge>
                    <Typography variant="heading-xl">업무에 유용한 사이트 및 어플</Typography>
                </Layout.Col>

                <List layout="horizontal" gap={14}>
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>등록일</Typography>} columnGap={8} showDivider={false}>
                        2026-03-10
                    </List.Item>
                    <Divider variant="dashed" layout="vertical" size={14} />
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>담당자</Typography>} columnGap={8} showDivider={false}>
                        홍길동
                    </List.Item>
                    <Divider variant="dashed" layout="vertical" size={14} />
                    <List.Item label={<Typography variant="body-lg" weight="semibold" primary>조회수</Typography>} columnGap={8} showDivider={false}>
                        10
                    </List.Item>
                </List>
            </Layout.Row>

            <Layout.Row layout="vertical" gap={24}>
                <Divider />

                {/* File */}
                <Box size="lg" bgColor="#F0F5F9" borderColor="#D9E2EA" gap={12} paddingTop={20} paddingBottom={20}>
                    <Typography variant="body-lg" weight="semibold" color="#464C53">첨부파일</Typography>

                    <Box variant="inner" borderColor="#D6E0EB" paddingTop={16} paddingBottom={16}>
                        <Space align="center" justify="space-between" >
                            <Space.Item size={8}>
                                <Icon name="attachment" size={24} />
                                <Typography variant="body-md" color="#464C53">공공데이터 개방 목록('24.12월기준).hwpx</Typography>
                            </Space.Item>
                            <Button variant="text" size="lg" leftIcon={<Icon name="download" size={16} color="#999" />}>다운로드</Button>
                        </Space>
                    </Box>
                </Box>

                <div>게시판 상세 내용 출력</div>

                {/* Comment */}
                <Layout.Row layout="vertical" gap={24}>
                    <Layout.Col gap={14}>
                        <Typography variant="heading-sm" color="#1A1A1A">댓글 <Typography variant="heading-sm" as="strong" color="#D31616">5</Typography></Typography>

                        <div className="comment-input-wrap">
                            <Textarea
                                fullWidth
                                rows={5}
                                placeholder="댓글을 입력하세요."
                                maxLength={300}
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                            <Space align="end" size={14} className="comment-input-footer">
                                <Space.Item size={0}>
                                    <Typography variant="body-lg" as="span">{commentValue.length}</Typography>
                                    <Typography variant="body-lg" as="span" tertiary>/300</Typography>
                                </Space.Item>

                                <Button>입력</Button>
                            </Space>
                        </div>
                    </Layout.Col>

                    <ul className="comment-list">
                        {commentData.map((comment, index) => (
                            <>
                                <li key={comment.id} className="comment-item">
                                    <Layout.Row gap={8}>
                                        <Layout.Col>
                                            <Space layout="vertical" size={4}>
                                                <Space.Item size="sm">
                                                    <div className="comment-avatar">
                                                        <img
                                                            src={comment.profileImage ?? "/src/assets/img/temp/temp_profile.png"}
                                                            alt={comment.author}
                                                        />
                                                    </div>

                                                    <Typography variant="body-md" weight="semibold">{comment.author}</Typography>
                                                </Space.Item>

                                                <Space.Item layout="vertical" align="start" size={6} className="comment-content">
                                                    {editingId === comment.id ? (
                                                        <div className="comment-input-wrap">
                                                            <Textarea
                                                                fullWidth
                                                                rows={5}
                                                                maxLength={300}
                                                                value={editValues[comment.id] ?? ""}
                                                                onChange={(e) => setEditValues((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                                                            />
                                                            <Space align="end" size={14} className="comment-input-footer">
                                                                <Space.Item size={0}>
                                                                    <Typography variant="body-lg" as="span">{(editValues[comment.id] ?? "").length}</Typography>
                                                                    <Typography variant="body-lg" as="span" tertiary>/300</Typography>
                                                                </Space.Item>
                                                                <Space.Item size={4}>
                                                                    <Button variant="outlined" onClick={() => setEditingId(null)}>취소</Button>
                                                                    <Button onClick={() => setEditingId(null)}>저장</Button>
                                                                </Space.Item>
                                                            </Space>
                                                        </div>
                                                    ) : (
                                                        <Typography variant="body-lg">{comment.content}</Typography>
                                                    )}
                                                    <Typography variant="body-sm" tertiary>{comment.date}</Typography>
                                                </Space.Item>
                                            </Space>
                                        </Layout.Col>

                                        <Layout.Col style={{ flex: "0 auto" }}>
                                            <Space size="sm">
                                                <Button
                                                    variant="text"
                                                    size="lg"
                                                    leftIcon={<Icon name="community" size={24} />}
                                                    onClick={() => setReplyOpenId(replyOpenId === comment.id ? null : comment.id)}
                                                    className="button-reply"
                                                >
                                                    답글
                                                </Button>
                                                <div className="comment-menu-wrap" onMouseDown={(e) => e.stopPropagation()}>
                                                    <Button
                                                        variant="text"
                                                        leftIcon={<Icon name="kebab" size={20} color="#666" />}
                                                        aria-label="더보기"
                                                        onClick={(e) => handleMenuToggle(e, comment.id)}
                                                    />
                                                    {menuOpenId === comment.id && (
                                                        <ul className="comment-menu-dropdown">
                                                            <li><button className="comment-menu-item" onClick={() => handleEditStart(comment.id, comment.content)}>수정</button></li>
                                                            <li><button className="comment-menu-item" onClick={() => setMenuOpenId(null)}>삭제</button></li>
                                                        </ul>
                                                    )}
                                                </div>
                                            </Space>
                                        </Layout.Col>
                                    </Layout.Row>

                                    {comment.replies && comment.replies.length > 0 && (
                                        <ul className="reply-list">
                                            {comment.replies.map((reply) => (
                                                <li key={reply.id} className="comment-item">
                                                    <Layout.Row gap={8}>
                                                        <Layout.Col>
                                                            <Space layout="vertical" size={4}>
                                                                <Space.Item size="sm">
                                                                    <div className="comment-avatar">
                                                                        <img
                                                                            src={reply.profileImage ?? "/src/assets/img/temp/temp_profile-2.png"}
                                                                            alt={reply.author}
                                                                        />
                                                                    </div>

                                                                    <Typography variant="body-md" weight="semibold">{reply.author}</Typography>
                                                                </Space.Item>

                                                                <Space.Item layout="vertical" align="start" size={6} className="comment-content">
                                                                    {editingId === reply.id ? (
                                                                        <div className="comment-input-wrap">
                                                                            <Textarea
                                                                                fullWidth
                                                                                rows={5}
                                                                                maxLength={300}
                                                                                value={editValues[reply.id] ?? ""}
                                                                                onChange={(e) => setEditValues((prev) => ({ ...prev, [reply.id]: e.target.value }))}
                                                                            />
                                                                            <Space align="end" size={14} className="comment-input-footer">
                                                                                <Space.Item size={0}>
                                                                                    <Typography variant="body-lg" as="span">{(editValues[reply.id] ?? "").length}</Typography>
                                                                                    <Typography variant="body-lg" as="span" tertiary>/300</Typography>
                                                                                </Space.Item>
                                                                                <Space.Item size={4}>
                                                                                    <Button variant="outlined" onClick={() => setEditingId(null)}>취소</Button>
                                                                                    <Button onClick={() => setEditingId(null)}>저장</Button>
                                                                                </Space.Item>
                                                                            </Space>
                                                                        </div>
                                                                    ) : (
                                                                        <Typography variant="body-lg">{reply.content}</Typography>
                                                                    )}
                                                                    <Typography variant="body-sm" tertiary>{reply.date}</Typography>
                                                                </Space.Item>
                                                            </Space>
                                                        </Layout.Col>

                                                        <Layout.Col style={{ flex: "0 auto" }}>
                                                            <Space size="sm">
                                                                <Button
                                                                    variant="text"
                                                                    size="lg"
                                                                    leftIcon={<Icon name="community" size={24} />}
                                                                    onClick={() => setReplyOpenId(replyOpenId === comment.id ? null : comment.id)}
                                                                    className="button-reply"
                                                                >
                                                                    답글
                                                                </Button>
                                                                <div className="comment-menu-wrap" onMouseDown={(e) => e.stopPropagation()}>
                                                                    <Button
                                                                        variant="text"
                                                                        leftIcon={<Icon name="kebab" size={20} color="#666" />}
                                                                        aria-label="더보기"
                                                                        onClick={(e) => handleMenuToggle(e, reply.id)}
                                                                    />
                                                                    {menuOpenId === reply.id && (
                                                                        <ul className="comment-menu-dropdown">
                                                                            <li><button className="comment-menu-item" onClick={() => handleEditStart(reply.id, reply.content)}>수정</button></li>
                                                                            <li><button className="comment-menu-item" onClick={() => setMenuOpenId(null)}>삭제</button></li>
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </Space>
                                                        </Layout.Col>
                                                    </Layout.Row>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {replyOpenId === comment.id && (
                                        <div className="comment-input-wrap">
                                            <Textarea
                                                fullWidth
                                                rows={5}
                                                placeholder="댓글을 입력하세요."
                                                maxLength={300}
                                                value={commentValue}
                                                onChange={(e) => setCommentValue(e.target.value)}
                                            />
                                            <Space align="end" size={14} className="comment-input-footer">
                                                <Space.Item size={0}>
                                                    <Typography variant="body-lg" as="span">{commentValue.length}</Typography>
                                                    <Typography variant="body-lg" as="span" tertiary>/300</Typography>
                                                </Space.Item>

                                                <Button>입력</Button>
                                            </Space>
                                        </div>
                                    )}
                                </li>
                                {index < commentData.length - 1 && (<Divider spacing={15} />)}
                            </>
                        ))}
                    </ul>
                </Layout.Row>

                {/* Navigation */}
                <div className="board-navigation">
                    <Space size={38} className="item">
                        <Space.Item size={14} style={{ flexShrink: 0 }}>
                            <Icon name="arrow-up" size={18} color="#999" />
                            <Typography variant="body-lg">이전글</Typography>
                        </Space.Item>

                        <Button
                            variant="text" size="lg"
                            style={{ color: prevHover ? "var(--color-primary)" : "#666" }}
                            onMouseEnter={() => setPrevHover(true)}
                            onMouseLeave={() => setPrevHover(false)}
                        >
                            이전 글 출력
                        </Button>
                    </Space>

                    <Divider />

                    <Space size={38} className="item">
                        <Space.Item size={14} style={{ flexShrink: 0 }}>
                            <Icon name="arrow-down" size={18} color="#999" />
                            <Typography variant="body-lg">다음글</Typography>
                        </Space.Item>

                        <Button
                            variant="text" size="lg"
                            style={{ color: nextHover ? "var(--color-primary)" : "#666" }}
                            onMouseEnter={() => setNextHover(true)}
                            onMouseLeave={() => setNextHover(false)}
                        >
                            다음 글 출력
                        </Button>
                    </Space>
                </div>
            </Layout.Row>

            <Layout.Row justify="end" gap={8}>
                <Button variant="outlined" size={isMobile ? "md" : "lg"}>목록</Button>
            </Layout.Row>
        </Layout >
    );
}