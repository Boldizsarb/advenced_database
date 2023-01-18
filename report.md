# Introduction 
As a not native English speaker, upon arrival to the country I had to teach myself in English since I had not spoken a word before. During my research, seeking the most efficient way to learn it, I came across various techniques. Multiple high volume study shows that besides many factors including habit, lifestyle and attitude, one of the best methods to memorise anything is the retrieval practice with high repetition (FutureLearn 2022). Flash Cards are a very good representation of this. The hard part is to find the right one, since most are pre-written and cost a fortune. 
My application offers a solution to both of these problems, let alone the great accessibility on the web on any device. There are no pre-written cards, it let the user customize their cards without worrying about the learning curb or having to study something that they potentially would never use. The application is not subject-bound, the only limit is the imagination of the user. 
# System Overview
 The application Flashy was structured following the MVC (Model, View, and Controller) architectural pattern (Geeks for geeks 2021). This not only makes the development faster but easier as well among many benefits such as good maintainability and expansion (Six Benefits of Using MVC Model for Effective Web Application Development 2016).  The user side part was built with conventional technologies including HTML (ejs), CSS, and JavaScript. Note that all GUI components were designed individually solely using CSS and a minuscule amount of  Bootstrap. On the server side under the hood, Node.js pulls the strings.  It is a highly scalable, lightweight, quick, and data-intensive framework that runs on the Chrome v8 engine, which turns javascript code into machine code (Heller 2020). 
 The database of choice was the non-relational database, also called NoSQL MongoDB. The underlying reason is the many advantages of NoSQL, one of the key points of which is scalability. NoSQL engines are built to scale up and take use of cloud computing. When we scale out or horizontally, we add resources to a single node (a computer or server). We can run a single database on several nodes. We can easily add and remove nodes when we scale out. As a result, NoSQL is an excellent choice for the cloud. It can be utilising the scalability of the cloud benefits since it can expand out.
Another important aspect is the performance and flexibility, being not constrained to pre-defined rules (Integrant 2021) and enabling to creation of different data types or entries to the database on the fly. 
The models and design of the content of the database as well as the controllers to govern the data were done by using mongoose. 
## Users:
Starting with the users is a crucial part of the application since all users have their very own custom-designed data without having access to someone else's.  The users can log in or register. In the case of a register, the program uses the hashing algorithm bcrypt that turns the password into a long string before uploading that into the database.  After login, the id of the user is stored in a session variable that enables access to each controller. 
![Alt Text](/public/images/login.jpg)
The main parts of the application are accessible from the navbar in the header which is incorporated into all pages. 
![Alt Text](/public/images/navbar.jpg)
## Categories:
First is the home page where the Categories and the Search are exclusively available. 
Each card when created or edited can be placed into a category which facilitates the distinction between different subjects and topics. All existent categories are highlighted on the home page as shown in the picture. Click, and all the cards that belong to that particular category will be displayed. 
![Alt Text](/public/images/categories.jpg)
## Search: 
Search also opens from the home page. It works by querying all content of the cards both front and back and all the cards that contain the matching word will be displayed. 
![Alt Text](/public/images/search.jpg)
## Adding a Card: 
Moving forward, next is Add a Card, which is self-explanatory. Users can add a limitless amount of text to the back and the front and can also define its category of it. After clicking the create button the user gets redirected to the My Cards page. 
![Alt Text](/public/images/adding%20a%20card.jpg)
## My Cards:
Expectedly the most used page of the whole application, where all the cards of the user get displayed. Due to the anticipated multitude of cards, the page was paginated with  Mongoose with a bootstrap layout. What it entails is that not all cards will be loaded at once from the database, by using skip() and limit(). The current limit is 10 cards all at once on a single page. 
The default view of each card is the front. It can be flipped, to reveal the back of the card just by simply clicking on them. The size of the cards is mediocre, and if it contains more text than is visible,  a scroll bar will appear to help the overfitting rather than increasing the size. To not block the view,  on hover the edit and delete button appears. 
![Alt Text](/public/images/my%20cards.jpg)
Deleting a card is as simple as pressing the delete button. Once it is clicked it deletes that document from the database.
Pressing on edit, the program grabs the individual object id and renders that object with its attributes to the editing page, where the user can edit the same tree attributes identically upon creation. 
![Alt Text](/public/images/editing%20a%20card.jpg)
In My Cards, the first is always the one that was edited the last!
## Pic Cards: 
Next is the Pic Cards,  where all the cards containing a picture on the back gets displayed. Uploading a picture was implemented using a Node js middleware multi (npm 2019). I work with a smaller image, under 16 MB, that is stored directly in a document using BinData(binary data) in a BSON type, and saved into the file system (uploads folder) with only the image reference stored in the database. The layout is very similar with the slight difference being the lack of the edit button and the dynamically adjusting size of the cards. 
![Alt Text](/public/images/picture%20cards.jpg)
The creation of the cards with a picture on them happens on the Upload pic. When uploading mime type makes sure that the uploaded file is an image, preventing any other type of file to enter the file system or the database (Webplatform.org 2003). 
![Alt Text](/public/images/uploading%20a%20pic.jpg)
