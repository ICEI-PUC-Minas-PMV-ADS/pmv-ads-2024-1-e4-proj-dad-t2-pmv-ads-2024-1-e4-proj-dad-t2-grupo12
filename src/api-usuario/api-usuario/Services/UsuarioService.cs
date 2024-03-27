﻿using api_usuario.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace api_usuario.Services
{
    public class UsuarioService
    {
        private readonly IMongoCollection<Usuario> _usuarioCollection;

        public UsuarioService(
            IOptions<UsuarioDatabaseSettings> usuarioDatabaseSettings)
        {
            var mongoclient = new MongoClient(
                usuarioDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoclient.GetDatabase(
                usuarioDatabaseSettings.Value.DatabaseName);
            _usuarioCollection = mongoDatabase.GetCollection<Usuario>(
                usuarioDatabaseSettings.Value.UsuarioCollectionName);
        }

        public async Task<List<Usuario>> GetAsync() =>
            await _usuarioCollection.Find(_ => true).ToListAsync();

        public async Task<Usuario?> GetAsync(string id) =>
            await _usuarioCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Usuario newUsuario) =>
            await _usuarioCollection.InsertOneAsync(newUsuario);

        public async Task UpdateAsync(string id, Usuario updatedUsuario) =>
            await _usuarioCollection.ReplaceOneAsync(x => x.Id == id, updatedUsuario);

        public async Task RemoveAsync(string id) =>
            await _usuarioCollection.DeleteOneAsync(x => x.Id == id);
    }
}