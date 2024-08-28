import NextLink from 'next/link';

const Link: React.FC = ({ href, children, ...props }) =>{    
    return (
        (<NextLink href={href} {...props}>

            {children}

        </NextLink>)
    );
}

export default Link;
