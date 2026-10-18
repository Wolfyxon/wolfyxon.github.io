"use client";

import EncryptionDialog from "@/components/EncryptionDialog/EncryptionDialog";
import Page from "@/layouts/Page";
import { useState } from "react";

export default function TestEncryptedPage() {
    const [text, setText] = useState<string | null>(null);

    function success(data: string) {
        setText(data);
    }

    return (
        <Page category="">
            {
                !text
                ? <EncryptionDialog 
                    note="This is a test. The password is 'admin'" 
                    base64buf="9C0ZpyHlsel41FvC+7KneW9Ju9uYh52eRJ0j+p0RQJ6C9gCFLhyh"
                    onSuccess={success}
                />
                : null
            }
            <h1>Welcome to the epic encrypted page</h1>
            <p>The encrypted data says: {text}</p>
        </Page>
    )
}