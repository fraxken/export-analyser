// Require Node.js Dependencies
const { readFileSync } = require("fs");

// Require Third-party Dependencies
const cherow = require("cherow");

const buf = readFileSync("./src/index.js");
const { body } = cherow.parseScript(buf.toString());
console.log(JSON.stringify(body, null, 4));

const requireStmt = new Map();

for (const stmt of body) {
    if (stmt.type === "VariableDeclaration") {
        const declaration = stmt.declarations[0];
        if (declaration.init.type !== "CallExpression") {
            continue;
        }

        if (declaration.init.callee.name === "require") {
            requireStmt.set(declaration.id.name, declaration.init.arguments[0].value);
        }
    }
    else if (stmt.type === "ExpressionStatement") {
        if (stmt.expression.type !== "AssignmentExpression") {
            continue;
        }

        const left = stmt.expression.left;
        if (left.type !== "MemberExpression") {
            continue;
        }
        if (left.object.name !== "module" || left.object.property.name !== "exports") {
            continue;
        }

        const right = stmt.expression.right;
        if (right.type === "ObjectExpression") {

        }
    }
}

console.log(requireStmt);
