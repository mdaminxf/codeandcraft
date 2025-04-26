export default function Footer()
{
    return(
        <footer className="py-8 bg-zinc-800 text-white">
        <div className="container mx-auto px-8 text-center">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    );
}