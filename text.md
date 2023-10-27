/_ default styles _/

html{
padding:0;
margin: 0;
height: 100vh;
background-color: #000000;  
}

body, h1, h2, h3, p, a {
margin: 0;
padding: 0;
font-family: 'poppins';
text-decoration: none;
color: inherit;
box-sizing: border-box;
height: 100%;
}

body {
background-color: #f4f4f4;
color: #333;
font-size: 16px;
line-height: 1.5;
width: 100vw;
height: 100vh;
}

body, .wrapper {
background-color:#5b5b5b;
min-height: 100vh;
}

.content .main-content {
max-width: 1600px;
margin: 0 auto;
padding: 0;
height: 100vh;
}
.header, .navbar, .main-content, .footer {
width: 100%;
}

.container {
max-width: 1600px;
margin: 0 auto;
padding: 0 20px;
}

/_ Header styles _/
.header {
background: rgb(255,255,255);
background: linear-gradient(107deg, rgba(255,255,255,1) 39%, rgba(196,0,0,1) 46%, rgba(6,0,0,1) 100%);
color: #fff;
width: 100%;
}

.header img{
width: 25%;
margin: 20px;
margin-left: 40px;
align-items: flex-start;
}

/_ Navbar styles _/
.navbar {
display: flex;
justify-content: space-between;
align-items: center;
vertical-align: middle;
padding: 5px ;
background-color: #000000;
margin-bottom: 4px;
padding-top: 10px;

}

.navbar a {
color: #fff;
text-decoration: none;
padding: 0 15px;

}
.navbar .user-login{
color: white;
margin-left: 4rem;

}

.article-list{
background-color: #5b5b5b;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 10px;
max-width: 80%;
align-items: center;
justify-content: center;
margin-left: auto;
margin-right: auto;
height: 100vh;

}

/_ Article card styles _/
.article-card {
position: relative;
max-height: 360px;
min-height: 360px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1px solid #e0e0e0;
padding: 10px;
border-radius: 5px;
background-color: white;
transition: box-shadow 0.3s;
text-decoration: none;
color: inherit;
text-justify: auto;
}
.article-card a \* {
text-decoration: none;
}

.article-card a h4{
margin: 0;
}

.article-card:hover {
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.article-image {
width: 100%;
border-radius: 5px;
margin-bottom: 10px;
flex-grow: 1;
}

.article-meta {
position: absolute;
font-size: 0.85rem;
color: #777;
clear: both;
display: flex;
flex-direction: column;
align-items: flex-end;
margin-top: auto;
bottom: 10px;
right: 10px;
}

/_ Top article specific styles _/
.top-article {
display: flex;
flex-direction: row;
max-width: auto;
grid-column: 1 / -1; /_ change direction to row for top article _/
}

.top-article .article-image {

max-width: 65%;
margin-right: 20px;

}

.top-article .article-meta, .top-article h4, .top-article p {
max-width: 100%;
width: 100%;
max-height: auto;
}

.vote-count {

top: 10px;
right: 10px;
font-size: 1rem;
color: #00a666;
display: flex;

margin-bottom: 10px;
}

.vote-count-icon {
margin-right: 5px;
}

/_ Footer styles _/
.footer {

bottom: 0;
background-color: #333;
color: #fff;
padding: 10px 0;
text-align: center;

}

/_Article details_/

.article-detail {
max-width: 80%;
margin: 20px auto;
padding: 20px;
border: 1px solid #e0e0e0;
border-radius: 5px;
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
background-color: white;
}

.article-detail h2 {
font-size: 2rem;
margin-bottom: 20px;
text-align: center;
}

.article-detail img {
width: 100%;
border-radius: 5px;
margin-bottom: 20px;
}

.article-detail p {
font-size: 1rem;
margin-bottom: 15px;
}

.article-detail .article-body {
font-size: 1.1rem;
line-height: 1.6;
text-align: justify;
font-family: Arial, Helvetica, sans-serif;
font-size: 14px;
}

.article-detail span{
font-weight: 600;
text-decoration: underline;
}

.article-detail-footer{
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
align-content: end;
}

.article-detail-footer p{
font-size: 12px;
margin-top: 10%
}

.article-detail button{
background-color: #5b5b5b;
color: white;
padding: 5px 15px;
border: none;
border-radius: 5px;
cursor: pointer;
transition: 0.3s;
margin-bottom: 10px;

}
.article-detail button:hover{
background-color: #393939; ;
}
/_ comments styles_/

.comment-bubble {
border: 1px solid #e0e0e0;
padding: 10px 15px;
border-radius: 20px;
background-color: #f9f9f9;
margin-bottom: 10px;
max-width: 95%;
position: relative;

}

.comment-bubble p{
font-size: 0.9rem;
font-family: 'Helvetica', sans-serif;
text-align: justify;
}

.comment-bubble .comment-delete:hover{
background-color: #c40000;
box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

/_ Style for the comment prompt _/
#comment-login-prompt {
font-size: 0.8rem;
text-align: center;
margin-top: 20px;
}

.add-comment-section {
border: 1px solid #e0e0e0;
padding: 15px 20px;
border-radius: 20px;
background-color: #f9f9f9;
margin-top: 20px;
max-width: 95%;
margin-left: auto;
margin-right: auto;
}

.add-comment-section textarea {
width: 100%;
padding: 10px;
border: 1px solid #e0e0e0;
border-radius: 10px;
margin-bottom: 10px;
font-family: 'Helvetica', sans-serif;
resize: vertical;
}

.add-comment-section button {
background-color: #4CAF50;
color: white;
padding: 10px 15px;
border: none;
border-radius: 5px;
cursor: pointer;
transition: 0.3s;
}

.add-comment-section button:hover {
background-color: #45a049;
}

.vote-button {

margin-left: auto;
background: none;
border: none;
cursor: pointer;
outline: none;
padding: 10px;
transition: color 0.3s;
color: #797979;
font-size: 1.5rem;
}

.vote-button:active {
transform: scale(0.95);
}

/_ Topics Button Styles _/
.topics-button-container {
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-bottom: 20px;
align-items: center;
justify-content: space-around;
}

.topic-button {

display: inline-block;
padding: 10px 20px;
margin: 10px;
transition: box-shadow 0.3s;
border-radius: 8px;
transition: background-color 0.3s, color 0.3s;
text-decoration: none;
}

.topic-button.active {

background-color: #c40000;
color: white;
box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.19);
}

.topic-button.inactive {

background-color: #f4f4f4;
color: #333;
}

.topic-button.inactive:hover {
background-color: #d2d2d2;
box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.19);
}

.sorting-controls {
display: flex;
flex-direction: column;

color: white;
padding: 5px;

margin-right: 5px;

margin-bottom: 20px;
}

.sorting-controls h5{
margin-right: 20px;
}
.switch-container {
display: flex;
flex-direction: row;
align-items: center;
margin: 2px;
}

.switch-label {
font-size: 12px;
text-align: center;

color: white;
}

.switch {
position: relative;
display: inline-block;
width: 50px;
height: 28px;
margin-right: 5px;

}

.switch input {
opacity: 0;
width: 0;
height: 0;
}

label.switch{
color: black
}

.slider {
display: flex;

position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
transition: 0.4s;
}

.slider:before {
position: absolute;
content: "";
height: 20px;
width: 20px;
left: 2px;
bottom: 4px;
background-color: white;
transition: 0.4s;
}

input:checked + .slider {
background-color: #c40000;
}

input:checked + .slider:before {
transform: translateX(26px);
}

.slider.round {
border-radius: 34px;
}

.slider.round:before {
border-radius: 50%;
}

.loading-container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;  
}

/_ Login Styles _/
.login{

max-width: 400px;
margin-top: 50%;
margin-bottom: 50%;

padding: 30px;
background-color: #fff;
border-radius: 10px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login h2 {
text-align: center;
margin-bottom: 20px;
}

.login input {
width: 100%;
padding: 10px 15px;
margin-bottom: 20px;
border: 1px solid #e0e0e0;
border-radius: 5px;
font-size: 16px;
}

.login button {
width: 100%;
padding: 10px 15px;
background-color: #c40000;
color: #fff;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}

.login button:hover {
background-color: #a00000;
}

.user-list {
margin-top: 30px;
background-color: #f9f9f9;
border: 1px solid #e0e0e0;
padding: 15px 20px;
border-radius: 20px;
}

.user-list h3 {
text-align: center;
margin-bottom: 10px;
}
