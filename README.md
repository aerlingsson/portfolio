### Arnar Haukur Erlingsson - MIGO
This branch contains the work I did for Migo: a startup company I volunteered for, for three months with three other individuals, before disbanding.
Migo was to be a platform for buying and selling dogs as pets. This should support both dog pounds and private individuals.
Most of my work were was done on the website, based on WordPress.
All files included in this branch are my own work.
Each of the following headers describe each file.

#### UML.png
Is a class diagram of the problem domain as described by the founders.
The structure is complete, however, the attributes of each class is not fully fleshed out and the modifiers are not accurate; not all attributes should be public.
Closed, hollow arrows denote generalization, open arrows denote association, and the diamond arrows denote composition.

#### DB_Schemas.pdf
Contains the tables I designed for the database for Migo and they contain some dummy data. These tables were added to the website's WordPress database.
Some tables still show some redundancy and need revision. For example, Dog_sale has a foreign key to the Dog table, and both tables store each dog's race. This attribute should be removed from the Dog_sale table.


#### Overview.png



#### Heisengard-child

##### functions.php

##### style.css

##### login.php

##### login_config.php

##### login_style.css
