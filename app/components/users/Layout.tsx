const Layout: React.FC<> = ({ children }) => {
    return (
        <div className="p-4">
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Layout;
