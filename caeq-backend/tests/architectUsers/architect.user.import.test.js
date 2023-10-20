describe('importArchitectUsers', () => {
    it('should import architect users from a CSV file', async () => {
        // Create a mock CSV file with test data
        const csvData = `name,email,password
            John Doe,john@example.com,123456
            Jane Doe,jane@example.com,abcdef`;

        // Write the mock CSV file to disk
        const filePath = '/path/to/test.csv';
        await fs.promises.writeFile(filePath, csvData);

        // Call the importArchitectUsers function with the mock CSV file path
        const result = await importArchitectUsers(filePath);

        // Assert that the function returns the expected result
        expect(result).toEqual({
            success: true,
            message: '2 architect users imported successfully'
        });

        // Clean up the mock CSV file
        await fs.promises.unlink(filePath);
    });

    it('should return an error if the CSV file is invalid', async () => {
        // Create a mock CSV file with invalid data
        const csvData = `name,email,password
            John Doe,john@example.com`;

        // Write the mock CSV file to disk
        const filePath = '/path/to/test.csv';
        await fs.promises.writeFile(filePath, csvData);

        // Call the importArchitectUsers function with the mock CSV file path
        const result = await importArchitectUsers(filePath);

        // Assert that the function returns the expected error message
        expect(result).toEqual({
            success: false,
            message: 'Invalid CSV file format'
        });

        // Clean up the mock CSV file
        await fs.promises.unlink(filePath);
    });
});
