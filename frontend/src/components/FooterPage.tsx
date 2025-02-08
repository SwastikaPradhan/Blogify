const FooterPage = () => {
  return (
    <footer className="border-t border-stone-200 py-4 text-center text-white  w-full mt-auto">
      <p className="text-sm">&copy; {new Date().getFullYear()} Don’t Forget to Write a Blog Before You Log Off!</p>
      <p className="text-sm mt-2">
        Made with <span className="text-red-500">♡</span> by  
        <a 
          href="https://github.com/SwastikaPradhan" 
          className="text-blue-400 hover:underline ml-1"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Swastika
        </a>
      </p>
    </footer>
  );
};

export default FooterPage;
