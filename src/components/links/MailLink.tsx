export default function MailLink(props: {children: string}) {
    return (
        <a href={`mailto:${props.children}`}>{props.children}</a>
    );
}