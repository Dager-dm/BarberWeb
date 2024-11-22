package com.company.barber.service;

import java.util.List;

public interface ICrud<T> {
    
    public T Create(T entity);

    public List<T> GetAll();

    public T Update(Long id, T updatedEntity);

    public String Delete(Long id);

    public T GetById(Long id) throws Exception;

}
