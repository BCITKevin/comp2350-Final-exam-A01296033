const database = include('/databaseConnection');

async function getAllUsers() {
    let sqlQuery = `
        SELECT
        purchase_item_id,
        item_name,
        item_description,
        cost,
        quantity
        FROM purchase_item;
    `;
    // (SELECT COUNT(*) FROM book WHERE book.author_id = author.author_id) AS 'num_of_books' 
    try {
        const results = await database.query(sqlQuery);
        console.log("-----------------------")
        console.log("results: ", results[0]);
        console.log("-----------------------")
        return results[0];
    }
    catch (err) {
        console.log("Error selecting from author table");
        console.log(err);
        return null;
    }
}

async function addQuantity(id) {
    console.log('id: ', id)

    let sqlInsertSalt = `
        UPDATE purchase_item
        SET quantity = quantity + 1
        WHERE purchase_item_id = :purchase_item_id
    `;

    let params = {
        purchase_item_id: id.id
    }

    console.log(sqlInsertSalt)

    try {
        const result = await database.query(sqlInsertSalt, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function downQuantity(id) {
    console.log('id: ', id)

    let sqlInsertSalt = `
        UPDATE purchase_item
        SET quantity = quantity - 1
        WHERE purchase_item_id = :purchase_item_id
    `;

    let params = {
        purchase_item_id: id.id
    }

    console.log(sqlInsertSalt)

    try {
        const result = await database.query(sqlInsertSalt, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function addItem(postData) {
    console.log("postData: ", postData);

    let sqlInsertSalt = `
        INSERT INTO purchase_item (item_name, item_description, cost, quantity)
        VALUES (:item_name, :item_description, :cost, :quantity);
    `;

    let params = {
        item_name: postData.name,
        item_description: postData.description,
        cost: postData.cost,
        quantity: postData.quantity,
    };

    console.log(sqlInsertSalt);

    try {
        const results = await database.query(sqlInsertSalt, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function totalAmount(result) {
    for (let i = 0; i < array.result; i++) {
		const total = result[i].cost * result[i].quantity
		return total;
	}
}

async function deleteUser(webUserId) {
    console.log('websUserId?: ', webUserId);
    let sqlDeleteUser = `
        DELETE FROM author
        WHERE author_id = :userID
    `;
    let params = {
        userID: webUserId
    };
    console.log(sqlDeleteUser);
    try {
        await database.query(sqlDeleteUser, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function deleteItem(id) {
    console.log('Id?: ', id);
    let sqlDeleteItem = `
        DELETE FROM purchase_item
        WHERE purchase_item_id = :item_id
    `;
    let params = {
        item_id: id.id
    };
    console.log(sqlDeleteItem);
    try {
        await database.query(sqlDeleteItem, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function showBooks(authorId) {
    let sqlQuery = `
        SELECT *
        FROM book
        WHERE author_id = ${authorId};
    `;

    try {
        const results = await database.query(sqlQuery);
        console.log("-----------------------")
        console.log("book data: ", results[0]);
        console.log("-----------------------")
        return results[0];
    }
    catch (err) {
        console.log("Error selecting from author table");
        console.log(err);
        return null;
    }
}


async function addBook(newBook, authorId) {
    console.log("postData: ", newBook, authorId);

    let sqlInsertSalt = `
        INSERT INTO book (title, description, ISBN, author_id)
        VALUES (:title, :description, :ISBN, ${authorId.id});
    `;

    let params = {
        title: newBook.title,
        description: newBook.description,
        ISBN: newBook.ISBN,
    };

    console.log(sqlInsertSalt);

    try {
    
        await database.query(sqlInsertSalt, params);

        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function get_user_by_userId(userId) {
    let sqlGetUser = `
        SELECT first_name, last_name
        FROM author
        WHERE author_id = ${userId};
    `

    let params = {
        userId: userId,
    }

    try {
        const authorName = await database.query(sqlGetUser, params)
        return authorName[0];
    } catch(err) {
        console.log(err)
        return false;
    }
}

async function deleteBook(bookId) {
    console.log(bookId);
    let sqlDeleteBook = `
        DELETE FROM book
        WHERE book_id = :bookId;
    `;
    let params = {
        bookId: bookId,
    };
    console.log(sqlDeleteBook);
    try {
        await database.query(sqlDeleteBook, params);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { getAllUsers, addItem, deleteItem, showBooks, addBook, deleteBook, get_user_by_userId, totalAmount, addQuantity, downQuantity };
