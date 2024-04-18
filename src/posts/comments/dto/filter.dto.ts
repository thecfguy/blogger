import { PostDto } from '@app/posts/dto/post.dto';

export class CommentFilterDto {
  id?: number | number[];
  name?: string;
  email?: string;
  body?: string;
  post?: Partial<PostDto>;
}
