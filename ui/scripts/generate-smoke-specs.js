const fs = require('fs');
const path = require('path');

const smokeFolder =
    path.join(
        process.cwd(),
        'tests',
        'smoke'
    );

const outputFolder =
    path.join(
        process.cwd(),
        'tests',
        'show-specs',
        'smoke'
    );

const outputFile =
    path.join(
        outputFolder,
        'smoke-specs-report.txt'
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
        smokeFolder
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
    'SMOKE SPECS REPORT\n';

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
                smokeFolder,
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
            `CAMINHO: tests/smoke/${file}\n`;

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