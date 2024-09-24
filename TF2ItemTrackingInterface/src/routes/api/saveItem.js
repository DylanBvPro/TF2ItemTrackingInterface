
import fs from 'fs';
import path from 'path';

export async function post({ request }) {
    const { inputValue, price } = await request.json();

    // Validate input
    if (!inputValue || price <= 0) {
        return {
            status: 400,
            body: { error: 'Invalid input' }
        };
    }

    const newItem = { name: inputValue, price };

    const jsonFilePath = path.join('src/lib/data/itemCategory.json');

    // Read existing data
    let userSection = [];
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        userSection = JSON.parse(data);
    } catch (err) {
        console.error('Error reading JSON file:', err);
    }

    // Add new item
    userSection.unshift(newItem);

    // Write updated data back to JSON
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(userSection, null, 2), 'utf8');
        return {
            status: 200,
            body: { message: 'Data saved successfully!' }
        };
    } catch (err) {
        console.error('Error writing JSON file:', err);
        return {
            status: 500,
            body: { error: 'Error saving data' }
        };
    }
}
