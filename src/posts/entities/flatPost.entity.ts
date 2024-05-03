import { Posts } from './post.entity';

export class FlatPost extends Posts {
  'user.id': Posts['user']['id'];
  userId: Posts['user']['id'];
}
