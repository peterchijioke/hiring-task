import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}

@Entity("task")
export class TaskEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ type: "timestamp", nullable: true })
  dueDate: Date;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.Pending, 
  })
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: "creator_id" })
  creator: UserEntity;
}
