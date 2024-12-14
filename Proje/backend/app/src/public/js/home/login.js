"use strict";

const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#button");

    loginBtn.addEventListener("click", login);

    function login() {
        const req = { 
            id : id.value,
            psword: psword.value,
        };

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/login"; // 로그인 성공시 원래 사이트로 돌아가기
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => { // 인터넷이 안되거나 사이트 문제가 있을시 나오는 문구
            console.error(new Error("Login error"));
        });
    
    }   