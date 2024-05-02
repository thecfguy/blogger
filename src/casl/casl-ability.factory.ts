import { Action } from '@app/common/constants/action';
import { User } from '@app/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Posts } from '@app/posts/entities/post.entity';
import { FlatPost } from '@app/posts/entities/flatPost.entity';
import { Comment } from '@app/posts/comments/entities/comment.entity';
import { FlatComment } from '@app/posts/comments/entities/flatComment.entity';

export type Subjects = InferSubjects<typeof Posts | typeof Comment | 'all' >;
export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  defineAbilitiesFor(user: User):Ability {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability);
    can(Action.Create, Posts);
    can(Action.Read, Posts);
    can<FlatPost>(Action.Update, Posts, { 'user.id': { $eq: user.id } }).because('user can update inly own Post')
    cannot(Action.Delete, Posts).because('You are not authorized to delete this post.');

    can(Action.Create, Comment);
    can(Action.Read, Comment);
    can<FlatComment>(Action.Update, Comment, { 'post.user.id': { $eq: user.id } }).because('user can update inly own Post Comment')
    cannot(Action.Delete, Comment).because('You are not authorized to delete this Comment.');
    
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
