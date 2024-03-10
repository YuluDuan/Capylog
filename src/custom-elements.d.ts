declare namespace JSX {
    interface IntrinsicElements {
        "passage-login": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            appId?: string;
        };
        "passage-register": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            appId?: string;
        };
    }
}
