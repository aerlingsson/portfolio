## Arnar Haukur Erlingsson - MIGO
This branch contains the work I did for Migo: a startup company I volunteered for, for three months, before it disbanded.
Migo was to be a platform for buying and selling dogs as pets. This should support both dog pounds and private individuals.
Most of my implemented work was done on the website, based on WordPress (WP).
All files included in this branch are my own work.
Each of the following headers briefly describe each file.

### UML.png
Is a class diagram of the problem domain as described by the founders.
The structure is complete, however, the attributes of each class is not fully fleshed out and the modifiers are not accurate; not all attributes should be public.
Closed, hollow arrows denote generalization, open arrows denote association, and the diamond arrows denote composition.

### DB_Schemas.pdf
Contains the tables I designed for the database for Migo and they contain some dummy data. These tables were added to the website's WordPress database.
Most notable here is the User table, which is more developed than the other tables, and contains a foreign key to the Zip_Codes table, which has a foreign key to the Country table. This reduces redundancy and space in the database.
Some tables still show some redundancy and need revision. For example, Dog_sale has a foreign key to the Dog table, and both tables store each dog's race. This attribute should be removed from the Dog_sale table. The address format in the User table can also be changed to use only a single varchar column, instead of multiple columns.

### Overview.png
Is a diagram I made for my own understanding of HTTP requests to web servers, as well as to explain the client and server components of the website to the other team members. It is somewhat a mixture of a flow chart and a component diagram. It also contains an overview of HTTP response classes for quick reference.

### login_screen.php
Shows a screenshot of a custom login screen for Migo. Functionality and styling is described in later sections.

### Heisengard-child
Is a child theme of the theme used on the website at the time. This contained all custom functionality and styling for the website - as is good practice for WordPress sites. It naturally inherits all styling and functionality from the parent theme, besides that which is overwritten/specified in the child folder. 
Functions.php and style.css are default files. For a child theme to be functional these do not have to contain anything, however, anything added to the files adds to, or overwrites, inherited features from the parent theme. Any error in these files will crash the website, if the theme is applied.
Each of the following headers describe each file in this folder.

#### functions.php
Describes a PHP function that registers and enqueues a custom style. The file starts with a call to the `add_action()` WP function, which hooks the `my_theme_enqueue_styles()` function to the WP core. By not including the parentheses, we avoid calling it at the same time.
The `my_theme_enqueue_styles()` function registers the custom style, with `login_style` as handle, the path to the custom CSS file, and the parent style as a dependency. It then enqueues it, making `login_style` accessible globally.

#### style.css
Is practically empty, however, it contains theme info and allows modifying the parent style.

#### login.html
Is the HTML file for the login screen. Currently only the **Login** button has functionality: it submits the data input into the **Brugernavn** and **Password** fields, using the `POST` method. 
On line 3 we declare that we want to use the login_style stylesheet, enqueued in `functions.php`.
On line 5 we create the login form, and state that we send the data to `login.php` on submit using the `POST` method.
Name and id attributes can be removed for the `<form>` tag, as they are not currently used.

#### login.php
Contains functionality for the login screen. It is called when a user presses the **Login** button.

#### login_style.css
