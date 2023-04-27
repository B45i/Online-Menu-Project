export function getTotal(items) {
    return items?.reduce(
        (acc, cur) =>
            acc + (cur.status !== 'CANCELLED' ? cur.price * cur.quantity : 0),
        0
    );
}
