const fs = require('fs');
const path = require('path');

// 1. auth.service.ts
const authSvcPath = path.join(__dirname, 'src/modules/auth/services/auth.service.ts');
if (fs.existsSync(authSvcPath)) {
    let authSvc = fs.readFileSync(authSvcPath, 'utf8');
    authSvc = authSvc.replace(/userId: user\._id,/g, 'userId: user._id.toString(),');
    fs.writeFileSync(authSvcPath, authSvc);
}

// 2. workflow.service.ts
const wfSvcPath = path.join(__dirname, 'src/modules/clearance/services/workflow.service.ts');
if (fs.existsSync(wfSvcPath)) {
    let wfSvc = fs.readFileSync(wfSvcPath, 'utf8');
    wfSvc = wfSvc.replace(/currentStage\._id\.toString\(\)/g, 'currentStage._id!.toString()');
    fs.writeFileSync(wfSvcPath, wfSvc);
}

// 3. staff.model.ts & student.model.ts
function fixNext(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/function\s*\(\s*next\s*\)/g, 'function(next: any)');
        fs.writeFileSync(filePath, content);
    }
}
fixNext(path.join(__dirname, 'src/modules/staff/models/staff.model.ts'));
fixNext(path.join(__dirname, 'src/modules/students/models/student.model.ts'));

// 4. jwt.ts
const jwtTsPath = path.join(__dirname, 'src/utils/jwt.ts');
if (fs.existsSync(jwtTsPath)) {
    let jwtTs = fs.readFileSync(jwtTsPath, 'utf8');
    jwtTs = jwtTs.replace(/\{ expiresIn: JWT_EXPIRES_IN \}/g, '{ expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions');
    jwtTs = jwtTs.replace(/\{ expiresIn: JWT_REFRESH_EXPIRES_IN \}/g, '{ expiresIn: JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions');
    fs.writeFileSync(jwtTsPath, jwtTs);
}
