import {MigrationInterface, QueryRunner} from "typeorm";

export class user1515362051936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query(`
       CREATE TABLE \`user\` (
         \`sequentialId\` int(11) NOT NULL AUTO_INCREMENT,
         \`id\` varchar(36) NOT NULL,
         \`firstName\` varchar(255) NOT NULL,
         \`lastName\` varchar(255) NOT NULL,
         \`age\` int(11) NULL,
         PRIMARY KEY (\`sequentialId\`)
       );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      return queryRunner.query('DROP TABLE `user`;')
    }

}
