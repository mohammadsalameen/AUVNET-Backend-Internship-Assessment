export const paginateQuery = async (Model, filter = {}, req, select = null, populate = null) => {
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;
  
    const totalCount = await Model.countDocuments(filter);
  
    let query = Model.find(filter).skip(skip).limit(limit);
    if (select) {
      query = query.select(select);
    }
    if (populate) {
      query = query.populate(populate);
    }
  
    const data = await query;
  
    return {
      data,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  };