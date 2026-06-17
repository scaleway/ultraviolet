import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recréation de __dirname pour l'ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins des fichiers
const jsonPath = path.join(__dirname, 'wcag.json');
const outputPath = path.join(__dirname, 'wcag_rules.md');

try {
    // 1. Lecture du fichier JSON
    const data = fs.readFileSync(jsonPath, 'utf8');
    const wcagData = JSON.parse(data);

    let markdownContent = "# Règles WCAG\n\n";

    // 2. Traitement de la structure spécifique du JSON
    // Le JSON commence par un objet racine ayant une propriété "principles"
    if (wcagData.principles && Array.isArray(wcagData.principles)) {

        wcagData.principles.forEach(principle => {
            // Écrit le Principe (ex: 1 Perceivable) -> H2
            if (principle.num && principle.title) {
                markdownContent += `## ${principle.num} ${principle.title}\n\n`;
            }

            // Parcourt les Guidelines de ce principe
            if (principle.guidelines && Array.isArray(principle.guidelines)) {
                principle.guidelines.forEach(guideline => {
                    // Écrit la Guideline (ex: 1.1 Text Alternatives) -> H3
                    if (guideline.num && guideline.title) {
                        markdownContent += `### ${guideline.num} ${guideline.title}\n\n`;
                    }

                    // Parcourt les Success Criteria de cette guideline
                    if (guideline.successcriteria && Array.isArray(guideline.successcriteria)) {
                        guideline.successcriteria.forEach(criteria => {
                            // Écrit le Critère de succès (ex: 1.1.1 Non-text Content) -> H4
                            if (criteria.num && criteria.title) {
                                markdownContent += `#### ${criteria.num} ${criteria.title}\n\n`;
                            }
                        });
                    }
                });
            }
        });

        // 3. Écriture du fichier Markdown final
        fs.writeFileSync(outputPath, markdownContent, 'utf8');
        console.log("Fichier 'wcag_rules.md' généré avec succès à partir de la structure ! ✨");

    } else {
        console.error("Erreur : La propriété racine 'principles' est introuvable ou n'est pas un tableau.");
    }

} catch (error) {
    console.error("Une erreur est survenue lors du traitement :", error.message);
}
