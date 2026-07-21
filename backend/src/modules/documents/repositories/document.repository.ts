import Doc, { IDoc, DocumentVerificationStatus } from '../models/document.model';

export class DocumentRepository {
  public async create(data: Partial<IDoc>): Promise<IDoc> {
    const doc = new Doc(data);
    return doc.save();
  }

  public async findById(id: string): Promise<IDoc | null> {
    return Doc.findById(id).populate('ownerId', 'firstName lastName email role');
  }

  public async findAll(filters: any = {}, options: { skip?: number, limit?: number, sort?: any } = {}): Promise<IDoc[]> {
    const query = Doc.find(filters).populate('ownerId', 'firstName lastName email');
    if (options.sort) query.sort(options.sort);
    if (options.skip !== undefined) query.skip(options.skip);
    if (options.limit !== undefined) query.limit(options.limit);
    return query;
  }

  public async count(filters: any = {}): Promise<number> {
    return Doc.countDocuments(filters);
  }

  public async update(id: string, data: Partial<IDoc>): Promise<IDoc | null> {
    return Doc.findByIdAndUpdate(id, data, { new: true });
  }

  public async softDelete(id: string): Promise<IDoc | null> {
    return Doc.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  public async restore(id: string): Promise<IDoc | null> {
    // Need to bypass the default pre('find') hook to find a deleted doc
    return Doc.findOneAndUpdate({ _id: id, isDeleted: true }, { isDeleted: false }, { new: true });
  }
}
