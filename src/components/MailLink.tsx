export default function MailLink(props: {mail: string}) {
    return (
        <a href={`mailto:${props.mail}`}>{props.mail}</a>
    );
}