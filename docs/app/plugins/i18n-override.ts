export default defineNuxtPlugin((nuxtApp) => {
	// Override pesan i18n Docus secara global
	// Mengubah "Pada halaman ini" -> "Daftar Isi"
	// Mengubah "Jelaskan dengan AI" -> "Jelaskan"
	const messages = nuxtApp.$localeMessages as Record<string, any> | undefined
	if (messages) {
		if (messages.docs) {
			messages.docs.toc = 'Daftar Isi'
		}
		if (messages.assistant) {
			messages.assistant.explainWithAi = 'Jelaskan'
		}
	}
})
