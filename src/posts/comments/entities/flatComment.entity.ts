import { Comment } from "./comment.entity";

export class FlatComment extends Comment {
  'post.user.id': Comment['post']['user']['id'];
}
