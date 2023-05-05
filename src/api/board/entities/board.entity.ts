import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board{

    @PrimaryGeneratedColumn()
    id : Number

    @Column()
    title : string

    @Column({length:5000})
    content : string
}