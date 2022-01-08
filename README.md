# SimpleZ
Website developed to help my friends fill and send university related papers. It gathers data via many forms and creates a pdf file containing ready-to-send document. It heavily relies on vue framework with javascript. The idea came to me when at the end of second term me and many others students like me had to resend said papers many times before they were accepted by the dean.

## Website setup
For starters install all modules using ```npm install```. And start hosting the website by typing ```npm run serve```, after few seconds just simply hit on one of two links displayed in your command prompt and enjoy cruising my website. It is important to notice that for cruicial features of the site you will need a serverside backend that i developed [here](https://github.com/krzysiou/SimpleZ-api) just follow the guide there to setup server for our website.

## Contents and features
The website is composed of many sub-websites which are being shown according to [router file](./src/router/index.js) which contains many routes and redirects. First site that will appear in front of you is a homepage.

### Homepage [component](./src/components/Home.vue)

![Zrzut ekranu 2022-01-9 o 00 06 18](https://user-images.githubusercontent.com/60892747/148662891-dad318ca-3596-4b37-8d34-09f123712866.png)

It briefly explains the main purpose of the site and lets you explore the other contents of webste by hitting the ```get started``` button.

### Log in and Sign in [component](./src/components/Manage.vue)

![Zrzut ekranu 2022-01-8 o 23 55 42](https://user-images.githubusercontent.com/60892747/148662615-f6413c37-6158-4bca-9886-fc10a401cd64.png)

![Zrzut ekranu 2022-01-8 o 23 55 53](https://user-images.githubusercontent.com/60892747/148662616-d849f641-c862-4e64-9927-3fcfdc5df4c0.png)


Another sub-page that will be displayed is a basic ```log in / sign in``` webpage meant for preety and pleasing account managment experience. It contains an css animation which separates log in and sign in parts. After logging or signing in you will be provided with and ```access token``` that will be stored in cookies using this [methods](./src/utils/cookies.js). it will allow you to skip logging in process and be redirected automatically to your account page.

### Account [component](./src/components/Account.vue)

![Zrzut ekranu 2022-01-8 o 23 34 33](https://user-images.githubusercontent.com/60892747/148662794-22f6e9d4-128e-4e9a-9a0d-c86d9ace1881.png)

An account site contains of buttons allowing you to ```create edit delete and download existing files``` it also got a ```log out``` feature. This page displays created files with according dates and file names so that you can save already created files and store them on your account for future use.

### File Creation [component](./src/components/CreateFile.vue) and Edit [component](./src/components/EditFile.vue)

![Zrzut ekranu 2022-01-9 o 00 08 07](https://user-images.githubusercontent.com/60892747/148662933-bc4da814-be2e-4ca8-8be0-128127f16d93.png)

This page contains a large form that will allow server to generate a file and pdf. It consists of three segments. ```Personal Info``` focused on your personal data like name, surname, e-mail etc. ```Main Subjects``` these are the mandatory courses that you are obligated to pass. They are defined by name, hour distribution and ects points. ```Side Subjects``` which are not predetermined by your faculty's dean but you have to finish enough of them to gather given amount of ects per term.

### Generated PDF [component](./src/components/DownloadFile.vue)

![Zrzut ekranu 2022-01-8 o 23 36 08](https://user-images.githubusercontent.com/60892747/148663094-0ac66893-639c-4ee4-8541-f2bd1a4681b3.png)

After hitting the download button you will be presented with a generated ```PDF``` file which then will be automatically downloaded and saved on your computer. It contains all of the gathered info with some extra features like summed up ects points and hours. This file is ready to be sent to your deans office. It saves your time by automating the whole process of filling papers and messing with right pagination of file. There are no differences when compared to hand-made paper sent to my dean during first term.
