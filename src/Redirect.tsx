export default function Redirect(data: {to: string}) {
    location.replace(data.to);

    return (
        <>
            <p>Redirecting to <a href={data.to}>{data.to}</a>...</p>
        </>
    );
}
