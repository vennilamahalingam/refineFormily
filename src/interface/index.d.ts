export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    tags: [];
    hit: string;
    user:{id: number};
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: IUserAvatar[];
}
