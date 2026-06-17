import { readFile, writeFile } from 'node:fs/promises';

const inputFile = 'rgaa-criteria.json';
const outputFile = 'criteres.md';

async function generateMarkdown() {
    try {
        // 1. Lire le fichier JSON
        const data = await readFile(inputFile, 'utf8');
        const jsonData = JSON.parse(data);

        let markdownContent = `# Table des critères d'accessibilité\n\n`;

        // 2. Parcourir les thématiques (topics)
        if (jsonData.topics && Array.isArray(jsonData.topics)) {
            jsonData.topics.forEach(topicObj => {
                const topicNum = topicObj.number;
                const topicTitle = topicObj.topic;

                // h2 pour les topics (## en Markdown correspond à un <h2>)
                markdownContent += `## ${topicNum}. ${topicTitle}\n\n`;

                // 3. Parcourir les critères de chaque thématique
                if (topicObj.criteria && Array.isArray(topicObj.criteria)) {
                    topicObj.criteria.forEach(criteriaObj => {
                        if (criteriaObj.criterium) {
                            const critNum = criteriaObj.criterium.number;
                            const critTitle = criteriaObj.criterium.title;

                            // h3 pour les critères (### en Markdown correspond à un <h3>)
                            // Structure demandée : numéro_topic.numéro_critère (ex: 10.2)
                            markdownContent += `### ${topicNum}.${critNum}. ${critTitle}\n\n`;
                        }
                    });
                }
            });
        }

        // 4. Écrire le fichier Markdown final
        await writeFile(outputFile, markdownContent, 'utf8');
        console.log(`✔ Fichier Markdown généré avec succès : ${outputFile}`);

    } catch (error) {
        console.error("❌ Une erreur est survenue :", error.message);
    }
}

generateMarkdown();
