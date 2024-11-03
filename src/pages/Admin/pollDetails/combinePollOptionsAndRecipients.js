function combinePollOptionsAndRecipients(pollOptions, pollRecipients) {

    const recipientsMap = pollRecipients.reduce((acc, recipient) => {
        acc[recipient.email] = recipient;
        return acc;
    }, {});

    const combinedData = pollOptions
        .filter(option => recipientsMap[option.assignedEmployee])
        .map(option => {
            const recipient = recipientsMap[option.assignedEmployee];
            return {
                content: option.content,
                selectedDate: option.selectedDate,
                selectedTime: option.selectedTime,
                email: option.assignedEmployee,
                name: recipient.name || 'Unknown',
                isSelected: option.isSelected
            };
        });


        console.log(combinedData);
        

    return combinedData;
}

export { combinePollOptionsAndRecipients };
