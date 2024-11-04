function combinePollOptionsAndRecipients(pollOptions, pollRecipients) {
    const recipientsMap = pollRecipients.reduce((acc, recipient) => {
        acc[recipient.email] = recipient;
        return acc;
    }, {});

    const combinedData = pollOptions.map(option => {
        // Check if the assignedEmployee exists and if it has a recipient
        const recipient = option.assignedEmployee && recipientsMap[option.assignedEmployee]
            ? recipientsMap[option.assignedEmployee]
            : null;

        if (recipient) {
            // If the recipient exists, return with their details
            return {
                content: option.content,
                selectedDate: option.selectedDate,
                selectedTime: option.selectedTime,
                email: option.assignedEmployee,
                name: recipient.name || 'Unknown',
                isSelected: option.isSelected
            };
        } else {
            // If no recipient found, return default values
            return {
                content: option.content,
                selectedDate: "--",
                selectedTime: "--",
                email: "-",
                name: "Not Selected",
                isSelected: option.isSelected
            };
        }
    });

    // Sort combined data by isSelected status
    combinedData.sort((a, b) => b.isSelected - a.isSelected);

    console.log(combinedData);

    return combinedData;
}

export { combinePollOptionsAndRecipients };
