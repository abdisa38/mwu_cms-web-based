const fs = require('fs');
const path = require('path');

// 1. Fix clearance repo count
const clearanceRepoPath = path.join(__dirname, 'src/modules/clearance/repositories/clearance.repository.ts');
let clearanceRepo = fs.readFileSync(clearanceRepoPath, 'utf8');
if (!clearanceRepo.includes('public async count')) {
    clearanceRepo = clearanceRepo.replace(/}\s*$/, `\n  public async count(filters: any = {}): Promise<number> {\n    return Clearance.countDocuments(filters);\n  }\n}`);
    fs.writeFileSync(clearanceRepoPath, clearanceRepo);
}

// 2. Fix IWorkflowStage _id
const workflowModelPath = path.join(__dirname, 'src/modules/clearance/models/workflow.model.ts');
let workflowModel = fs.readFileSync(workflowModelPath, 'utf8');
if (!workflowModel.includes('_id?: mongoose.Types.ObjectId')) {
    workflowModel = workflowModel.replace('export interface IWorkflowStage {', 'export interface IWorkflowStage {\n  _id?: mongoose.Types.ObjectId;');
    fs.writeFileSync(workflowModelPath, workflowModel);
}

// 3. Fix pre('find') hooks using @ts-ignore
function fixPreFind(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('this.where({ isDeleted')) {
        content = content.replace('this.where({ isDeleted', '// @ts-ignore\n  this.where({ isDeleted');
        content = content.replace('(next as any)();', 'next();');
        fs.writeFileSync(filePath, content);
    }
}
fixPreFind(path.join(__dirname, 'src/modules/staff/models/staff.model.ts'));
fixPreFind(path.join(__dirname, 'src/modules/students/models/student.model.ts'));

// 4. Fix auth user save hook that got messed up
const authUserPath = path.join(__dirname, 'src/modules/auth/models/user.model.ts');
if (fs.existsSync(authUserPath)) {
    let authUser = fs.readFileSync(authUserPath, 'utf8');
    authUser = authUser.replace(/\(next as any\)\(\);/g, 'next();').replace(/\(next as any\)\(err\);/g, 'next(err as any);');
    fs.writeFileSync(authUserPath, authUser);
}

// 5. Fix auth service id
const authSvcPath = path.join(__dirname, 'src/modules/auth/services/auth.service.ts');
if (fs.existsSync(authSvcPath)) {
    let authSvc = fs.readFileSync(authSvcPath, 'utf8');
    authSvc = authSvc.replace(/user\.id/g, 'user._id');
    fs.writeFileSync(authSvcPath, authSvc);
}

// 6. Fix jwt.ts if it exists
const jwtTsPath = path.join(__dirname, 'src/utils/jwt.ts');
if (fs.existsSync(jwtTsPath)) {
    let jwtTs = fs.readFileSync(jwtTsPath, 'utf8');
    jwtTs = jwtTs.replace(/\{ expiresIn: JWT_EXPIRES_IN \}/g, '{ expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions');
    fs.writeFileSync(jwtTsPath, jwtTs);
}

console.log("Fixes applied.");
