const convertDate = (date: string) => {
    const d = Date.parse(date)
    const timezone = 'Europe/Warsaw'

    let ye = new Intl.DateTimeFormat('pl', { year: 'numeric', timeZone: timezone }).format(d);
    let mo = new Intl.DateTimeFormat('pl', { month: 'long', timeZone: timezone }).format(d);
    let da = new Intl.DateTimeFormat('pl', { day: '2-digit', timeZone: timezone }).format(d);
    let ho = new Intl.DateTimeFormat('pl', { hour: '2-digit', timeZone: timezone }).format(d);
    let mi = new Intl.DateTimeFormat('pl', { minute: '2-digit', timeZone: timezone }).format(d);
    let se = new Intl.DateTimeFormat('pl', { second: '2-digit', timeZone: timezone }).format(d);

    mi = mi.length === 1 ? `0${mi}` : mi
    se = se.length === 1 ? `0${se}` : se

    return `${da} ${mo} ${ye} ${ho}:${mi}:${se}`
}

export default convertDate;
