export default function TextLink(data: {children: string}) {
    return (
        <a href={data.children}>{data.children}</a>
    );
}