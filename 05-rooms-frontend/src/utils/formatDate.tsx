export default function formatDate(date: Date){
    const formatter = new Intl.DateTimeFormat('en-US',{
        year:'numeric',
        month: 'short',
        day: 'numeric'
    });
    return formatter.format(date);
    //npm install vitest -D
}