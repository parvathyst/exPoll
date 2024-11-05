
function downloadExcel(pollDetails, pollOptionsAndRecipients) {
    const wb = XLSX.utils.book_new();

    const data = [
        ["Title", pollDetails.title],
        ["Description", pollDetails.description],
        [],
        ["Content", "Name", "Email"]
    ];

    pollOptionsAndRecipients.forEach(option => {
        data.push([option.content, option.selectedUserName, option.selectedUserEmail]);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);

    const colWidth = [
        { wch: 20 },
        { wch: 20 },
        { wch: 30 }
    ];
    ws['!cols'] = colWidth;

    ws['!rows'] = [];
    for (let i = 0; i < data.length; i++) {
        ws['!rows'][i] = { hpt: 15 };
    }

    XLSX.utils.book_append_sheet(wb, ws, "Poll Data");

    const fileName = `${pollDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xlsx`;

    XLSX.writeFile(wb, fileName);
}

export { downloadExcel };