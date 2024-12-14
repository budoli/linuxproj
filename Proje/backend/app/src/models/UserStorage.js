"use strict";

const mysql = require("mysql2");
require("dotenv").config();

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.AWS_RDS_HOST,
  user: process.env.AWS_RDS_USER,
  password: process.env.AWS_RDS_PASSWORD,
  database: process.env.AWS_RDS_DB,
});

class UserStorage {

    // 로그인 데이터를 getUserInfo 메서드로 보내기
    static #getUserInfo(rows, id) {
        const user = rows.find(row => row.id === id);
        return user ? user : null;
    }

    // 사용자 정보 조회
    static getUsersInfo(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            connection.execute(query, [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const userInfo = this.#getUserInfo(rows, id);
                    resolve(userInfo);
                }
            });
        });
    }

    // 회원 가입
    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            // 기존에 같은 id가 있는지 확인
            const checkQuery = 'SELECT * FROM users WHERE id = ?';
            connection.execute(checkQuery, [userInfo.id], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows.length > 0) {  // id가 이미 존재하는 경우
                    reject('The ID already exists.');
                } else {
                    const insertQuery = 'INSERT INTO users (id, name, psword) VALUES (?, ?, ?)';
                    connection.execute(insertQuery, [userInfo.id, userInfo.name, userInfo.psword], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ success: true });
                        }
                    });
                }
            });
        });
    }
}

module.exports = UserStorage;
