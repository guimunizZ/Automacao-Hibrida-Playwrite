const fs = require('fs');
const path = require('path');

const alternativeFolder =
    path.join(
        process.cwd(),
        'tests',
        'booking',
        'alternative'
    );

const outputFolder =
    path.join(
        process.cwd(),
        'tests',
        'show-specs',
        'alternative'
    );

const outputFile =
    path.join(
        outputFolder,
        'alternative-specs-report.txt'
    );

if (
    !fs.existsSync(
        outputFolder
    )
) {

    fs.mkdirSync(
        outputFolder,
        {
            recursive: true
        }
    );
}

const files =
    fs.readdirSync(
        alternativeFolder
    )
    .filter(
        file =>
            file.endsWith(
                '.spec.ts'
            )
    )
    .sort();

let report = '';

report +=
    '=====================================================\n';

report +=
    'ALTERNATIVE SPECS REPORT\n';

report +=
    `GERADO EM: ${new Date().toLocaleString()}\n`;

report +=
    '=====================================================\n\n';

files.forEach(
    (
        file,
        index
    ) => {

        const filePath =
            path.join(
                alternativeFolder,
                file
            );

        const content =
            fs.readFileSync(
                filePath,
                'utf8'
            );

        report +=
            '=====================================================\n';

        report +=
            `NÚMERO:${index + 1}\n`;

        report +=
            `NOME: ${file}\n`;

        report +=
            `CAMINHO: tests/booking/alternative/${file}\n`;

        report +=
            'FUNCAO: PREENCHER MANUALMENTE\n';

        report +=
            '=====================================================\n\n';

        report +=
            content;

        report +=
            '\n\n';
    }
);

fs.writeFileSync(
    outputFile,
    report
);

console.log(
    `Arquivo gerado: ${outputFile}`
);