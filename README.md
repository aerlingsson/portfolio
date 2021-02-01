## Arnar Haukur Erlingsson - MIGO
This branch contains the work I did for Migo: a startup company I volunteered for, for three months, before it disbanded.
Migo was to be a platform for buying and selling dogs as pets. This should support both dog pounds and private individuals.
Most of my implemented work was done on the website, based on WordPress (WP).
All files included in this branch are my own work.
Each of the following headers briefly describe each file.

### Diagrams
Is a folder containing diagrams and database tables I created while working for Migo.

#### UML.png
Is a class diagram of the problem domain as described by the founders.
The structure is complete, however, the attributes of each class is not fully fleshed out and the modifiers are not accurate; not all attributes should be public.
Closed, hollow arrows denote generalization, open arrows denote association, and the diamond arrows denote composition.

#### DB_Schemas.pdf
Contains the tables I designed for the database for Migo and they contain some dummy data. These tables were added to the website's WordPress database.
Most notable here is the User table, which is more developed than the other tables, and contains a foreign key to the Zip_Codes table, which has a foreign key to the Country table. This reduces redundancy and space in the database.
Some tables still show some redundancy and need revision. For example, Dog_sale has a foreign key to the Dog table, and both tables store each dog's race. This attribute should be removed from the Dog_sale table. The address format in the User table can also be changed to use only a single varchar column, instead of multiple columns.

#### Overview.png
Is a diagram I made for my own understanding of HTTP requests to web servers, as well as to explain the client and server components of the website to the other team members. It is somewhat a mixture of a flow chart and a component diagram. It also contains an overview of HTTP response classes for quick reference.

### login_screen.png
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
Contains functionality for the login screen. It is called when a user presses the **Login** button on the login page. Any submitted data will be contained in the `$_POST` suberglobal. If `$_POST` is not empty, we import the WP database, `wpdb` - this provides easy query access to the WP database. Input usernames and passwords are accessible through their HTML `name` attributes: `$_POST["username"]` and `$_POST["pass"]`.

On line 6 we construct an associative array, for the response, containing an empty result array and an empty error value. Input validation simply checks whether anything was input into the username and password fields. If any of the two are missing, an error value is assigned in `$response`. In case of them both missing, the username error message is overwritten by the password error message. This could be changed to be an array, to store both errors, if necessary.
If both username and password are submitted, we encrypt the password, using PHP's built-in `password_hash()`.

In this case we intentionally do not sanitize user input ourselves, as `$wpdb->prepare()` statements do this automatically. We prepare a SQL query to the database, to check if the input user exists and has the input password. We can do this without storing the user's actual password, as `password_hash()` produces the same output, given the same input and options. However, if we at some point change the options, or the implementation of `password_hash()` is changed, this approach may cause issues in the future.

After preparing the query, we execute it and request the result as an associative array. If the amount of rows returned are < 1, the username does not exist. Else we check if the input password matches the stored password for that user. If successful, this functionality should redirect the user to another page, however, this functionality is not implemented here. When checking the query results, we echo the errors, if they happen. A better approach would be to continue using the `$response` array. Furthermore, the error message should state that either the username or password was wrong, instead of telling the user which is wrong. Telling the user that the password does not match the username, confirms to them that a user with that username exists - removing a variable from the equation, for someone trying to gain unauthorized access to the system.

#### login_style.css
Is the stylesheet for the login screen. We set text and password fields, as well as the **Login** button, to be 100% of the width of whatever parent contains it.
We also set custom styling for the **Fortryd** button and make buttons go slightly transparent when hovering over them. As we do not define any color for the hover, buttons also become gray when hovered over.
Finally, we set the logo picture to be 30% of the width and set the border radius to be 50%. This gives the logo a circular look, rather than a square one. We also set the margin to auto - making sure that the logo can scale to any screen size.
