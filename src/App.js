import * as React from 'react';

const App = () => {
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
    <div>
        <Button onClick={handleOpen}>Open</Button>
        <Button onClick={handleClose}>Close</Button>

        {isOpen && <div>Toggle is on</div>}
        {!isOpen && <div>Toggle is off</div>}
      </div>
    );
};

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};



export default App;
