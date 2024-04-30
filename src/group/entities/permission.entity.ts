import { Group } from '@app/group/entities/group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  module: string;

  @Column({ length: 255, nullable: false })
  access: string;

  @Column({ length: 255, nullable: false })
  ownership: string;

  @ManyToOne(() => Group, (group) => group.permission, {
    onDelete: 'CASCADE',
  })
  group: Group;
}
