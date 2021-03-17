export default function formatNumber(value) {
    const formatedNumber = Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return formatedNumber;
}