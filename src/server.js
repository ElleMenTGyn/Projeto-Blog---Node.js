import express from 'express';
import { fileURLToPath } from "url";
import path from 'path';
import postsRoutes from "./routes/postsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.locals.year = new Date().getFullYear();   
app.locals.siteTitle = "Meu Blog";    

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.locals.formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso; // fallback se algo vier inválido
  }
};

app.use((req, res, next) => {
  res.locals.pageTitle   = "Meu Blog"; // default geral
  res.locals.heroImage   = "/assets/img/home-bg.jpg";
  res.locals.heroTitle   = "Bem-vindo ao Blog";
  res.locals.heroSubtitle= "Ideias, códigos e café.";
  res.locals.formatDate   = app.locals.formatDate;
  next(); // não esqueça!
});

app.use("/", postsRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });